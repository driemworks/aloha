export interface EffectMetadata<T> {
    propertyName: Extract<keyof T, string>;
    dispatch: boolean;
}
export declare function Effect<T>({ dispatch }?: {
    dispatch?: boolean | undefined;
}): PropertyDecorator;
export declare function getSourceForInstance<T>(instance: T): T;
export declare function getSourceMetadata<T>(instance: T): Array<EffectMetadata<T>>;
export declare type EffectsMetadata<T> = {
    [key in Extract<keyof T, string>]?: {
        dispatch: boolean;
    };
};
export declare function getEffectsMetadata<T>(instance: T): EffectsMetadata<T>;
