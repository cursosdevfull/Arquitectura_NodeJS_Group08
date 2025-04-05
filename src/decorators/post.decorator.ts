export const Post = (route: string) => {
    return (target: any, propertyKey: string) => {
        console.log(`Post decorator called on ${target.constructor.name} for method ${propertyKey}`);

        const routes = Reflect.getMetadata("routes", target.constructor) || [];

        routes.push({ method: "post", route, handler: propertyKey });

        Reflect.defineMetadata("routes", routes, target.constructor);

  /*       const routes = Reflect.getMetadata("routes", target.constructor) || [];
        routes.push({ method: "get", route, handler: propertyKey });
        Reflect.defineMetadata("routes", routes, target.constructor);
        console.log(`Routes for ${target.constructor.name}:`, routes); */
    }
}