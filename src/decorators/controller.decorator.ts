export const Controller = (path:string) => {
    return (target: new (...args: any[]) => any) => {
        Reflect.defineMetadata("path", path, target);

        if(!Reflect.hasMetadata("routes", target)) {
            Reflect.defineMetadata("routes", [], target);
        }


        console.log(`Controller decorator called on ${target.name}. Path: ${path}`);

        target.prototype.getUser = function () {
            return { username: this.username };
        }

/*         const instance = new target();
        console.log(`Instance of ${target.name} created`, instance);
        console.log(`Instance properties:`, Object.getOwnPropertyNames(instance));
        console.log(`Instance methods:`, Object.getOwnPropertyNames(Object.getPrototypeOf(instance)));
        console.log(`Instance method getUser:`, instance.getUser()); */

    }
}