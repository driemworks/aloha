"use strict";

// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders

const childProcess = require("child_process"),
	path = require("path"),
	fs = require("fs"),
	processWrapper = require("./process-wrapper");

const supportedPlatforms = [
	"win32",
	"linux",
	"darwin"
];

const nodeModulesDirName = "node_modules";

const getNpmExecutable = (platform) => {
	let npmExecutableName = "npm";

	if (platform === "win32") {
		npmExecutableName += ".cmd";
	}

	return npmExecutableName;
};

const getNpmPrefix = (pathToNpm) => {
	try {
		const npmPrefixStdout = childProcess.execSync(`${pathToNpm} config get prefix`);
		return npmPrefixStdout && npmPrefixStdout.toString().trim();
	} catch (err) {
		console.error(err.message);
	}

	return null;
};

const getPathFromNpmConfig = (platform, packageName) => {
	const pathToNpm = getNpmExecutable(platform),
		npmConfigPrefix = getNpmPrefix(pathToNpm);

	if (npmConfigPrefix) {
		let nodeModulesPath = path.join(npmConfigPrefix, nodeModulesDirName);

		if (platform !== "win32") {
			nodeModulesPath = path.join(npmConfigPrefix, "lib", nodeModulesDirName);
		}

		const packagePath = path.join(nodeModulesPath, packageName);

		if (fs.existsSync(packagePath)) {
			return packagePath;
		}
	}

	return null;
};

const getPathFromExecutableNameOnWindows = (packageName, executableName) => {
	try {
		const whereResult = (childProcess.execSync(`where ${executableName}`) || "").toString().split("\n");
		for (const line of whereResult) {
			const pathToExecutable = line && line.trim(),
				pathToLib = pathToExecutable && path.join(path.dirname(pathToExecutable), nodeModulesDirName, packageName);

			if (pathToLib) {
				if (fs.existsSync(pathToLib)) {
					return pathToLib;
				}

				// In case the path to <package>/bin/ is added to the PATH
				const resolvedPath = getPathWhenExecutableIsAddedDirectlyToPath(packageName, pathToExecutable);
				if (resolvedPath) {
					return resolvedPath;
				}
			}
		}
	} catch (err) {
		console.error(err.message);
	}

	return null;
};

const getPathFromExecutableNameOnNonWindows = (packageName, executableName) => {
	try {
		// Second way to find it is to use the result of which command
		// It will give path to the executable, which is a symlink in fact, so we can get the full path from it:

		// whichResult: /usr/local/nvm/versions/node/v4.2.1/bin/mobile-cli-lib
		// lsLResult: lrwxrwxrwx 1 rvladimirov rvladimirov 52 Oct 20 14:51 /usr/local/nvm/versions/node/v4.2.1/bin/mobile-cli-lib -> ../lib/node_modules/mobile-cli-lib/bin/common-lib.js
		const whichResult = (childProcess.execSync(`which ${executableName}`) || "").toString().trim(),
			lsLResult = (childProcess.execSync(`ls -l \`which ${executableName}\``) || "").toString().trim();

		if (whichResult && lsLResult) {
			const regex = new RegExp(`${whichResult}\\s+->\\s+(.*?)$`),
				match = lsLResult.match(regex);

			if (match && match[1]) {
				const pathToRealExecutable = path.join(path.dirname(whichResult), match[1]);

				// The executable is somewhere inside node_modules/<package name>/ directory,
				// so after we have the full path to executable, we are safe to match the path to node_modules/<package name>/ from it - that's where our module is.
				const packagePathMatch = pathToRealExecutable.match(new RegExp(`(.*?${path.join(nodeModulesDirName, packageName)}).*$`));

				if (packagePathMatch) {
					return packagePathMatch[1];
				}
			}

			// In case executable is added to PATH directly
			return getPathWhenExecutableIsAddedDirectlyToPath(packageName, whichResult);
		}
	} catch (err) {
		console.error(err.message);
	}

	return null;
};

const getPathWhenExecutableIsAddedDirectlyToPath = (packageName, executablePath) => {
	const pathToPackageJson = path.join(path.dirname(executablePath), "..", "package.json");
	if (fs.existsSync(pathToPackageJson)) {
		const packageNameFromPackageJson = JSON.parse(fs.readFileSync(pathToPackageJson)).name;
		if (packageNameFromPackageJson === packageName) {
			return path.dirname(pathToPackageJson);
		}
	}

	return null;
};

// For some packages executable name is not the same as package name
// For example our package is called nativescript, but the executable name is called "tns"
const getPath = (packageName, executableName) => {
	const platform = processWrapper.getProcessPlatform();

	if (supportedPlatforms.indexOf(platform) === -1) {
		throw new Error(`OS '${platform}' is not supported.'`);
	}

	let foundPath = null;
	if (executableName) {
		foundPath = platform === "win32" ?
			getPathFromExecutableNameOnWindows(packageName, executableName) :
			getPathFromExecutableNameOnNonWindows(packageName, executableName);
	}

	if (!foundPath) {
		foundPath = getPathFromNpmConfig(platform, packageName);
	}

	return foundPath;
};

module.exports = {
	getPath: getPath
};
