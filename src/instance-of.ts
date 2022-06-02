 function instanceOf(obj: any, ctor: any): boolean {
    // validate constructor
    if (typeof ctor !== 'function') {
        return false
    }
    // validate with instanceof
    if (obj instanceof ctor) {
        return true;
    }
    return !!(obj && obj.constructor && obj.constructor.name === ctor.name);
}

export {
    instanceOf
}
