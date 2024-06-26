

export interface UserType {
    id: number;
    name : string;
    phone : string;
    email : string;
    avatar : string;
    avatar_url : string;
    permissions : string[]
}

export default class User {
    user? : UserType;

    constructor(user? : UserType) {
        this.user = user;
    }

    canAccess(permission : string) {
        let UserPermissions = this.user?.permissions ?? [];
        let permissions = permission.split('|').filter(permission => UserPermissions.includes(permission))

        return permissions.length > 0
    }
}