import { DataTypes } from "sequelize";
export declare const Account: {
    id: {
        type: DataTypes.AbstractDataTypeConstructor;
        defaultValue: DataTypes.AbstractDataTypeConstructor;
        primaryKey: boolean;
    };
    type: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
    };
    provider: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
    };
    providerAccountId: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
    };
    refresh_token: {
        type: DataTypes.StringDataTypeConstructor;
    };
    access_token: {
        type: DataTypes.StringDataTypeConstructor;
    };
    expires_at: {
        type: DataTypes.IntegerDataTypeConstructor;
    };
    token_type: {
        type: DataTypes.StringDataTypeConstructor;
    };
    scope: {
        type: DataTypes.StringDataTypeConstructor;
    };
    id_token: {
        type: DataTypes.TextDataTypeConstructor;
    };
    session_state: {
        type: DataTypes.StringDataTypeConstructor;
    };
    userId: {
        type: DataTypes.AbstractDataTypeConstructor;
    };
};
export declare const User: {
    id: {
        type: DataTypes.AbstractDataTypeConstructor;
        defaultValue: DataTypes.AbstractDataTypeConstructor;
        primaryKey: boolean;
    };
    name: {
        type: DataTypes.StringDataTypeConstructor;
    };
    email: {
        type: DataTypes.StringDataTypeConstructor;
        unique: string;
    };
    emailVerified: {
        type: DataTypes.DateDataTypeConstructor;
    };
    image: {
        type: DataTypes.StringDataTypeConstructor;
    };
};
export declare const Session: {
    id: {
        type: DataTypes.AbstractDataTypeConstructor;
        defaultValue: DataTypes.AbstractDataTypeConstructor;
        primaryKey: boolean;
    };
    expires: {
        type: DataTypes.DateDataTypeConstructor;
        allowNull: boolean;
    };
    sessionToken: {
        type: DataTypes.StringDataTypeConstructor;
        unique: string;
        allowNull: boolean;
    };
    userId: {
        type: DataTypes.AbstractDataTypeConstructor;
    };
};
export declare const VerificationToken: {
    token: {
        type: DataTypes.StringDataTypeConstructor;
        primaryKey: boolean;
    };
    identifier: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
    };
    expires: {
        type: DataTypes.DateDataTypeConstructor;
        allowNull: boolean;
    };
};
//# sourceMappingURL=models.d.ts.map