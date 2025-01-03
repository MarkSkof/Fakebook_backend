/**
 * <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16}}>
 *  <p>Official <a href="https://sequelize.org/docs/v6/getting-started/">Sequilize</a> adapter for Auth.js / NextAuth.js.</p>
 *  <a href="https://sequelize.org/">
 *   <img style={{display: "block"}} src="https://authjs.dev/img/adapters/sequelize.svg" height="30"/>
 *  </a>
 * </div>
 *
 * ## Installation
 *
 * ```bash npm2yarn
 * npm install next-auth @auth/sequelize-adapter sequelize
 * ```
 *
 * @module @auth/sequelize-adapter
 */
import type { Adapter, AdapterUser, AdapterAccount, AdapterSession, VerificationToken } from "@auth/core/adapters";
import { Sequelize, Model, ModelCtor } from "sequelize";
import * as defaultModels from "./models.js";
export { defaultModels as models };
interface AccountInstance extends Model<AdapterAccount, Partial<AdapterAccount>>, AdapterAccount {
}
interface UserInstance extends Model<AdapterUser, Partial<AdapterUser>>, AdapterUser {
}
interface SessionInstance extends Model<AdapterSession, Partial<AdapterSession>>, AdapterSession {
}
interface VerificationTokenInstance extends Model<VerificationToken, Partial<VerificationToken>>, VerificationToken {
}
/** This is the interface of the Sequelize adapter options. */
export interface SequelizeAdapterOptions {
    /**
     * Whether to {@link https://sequelize.org/docs/v6/core-concepts/model-basics/#model-synchronization synchronize} the models or not.
     */
    synchronize?: boolean;
    /**
     * The {@link https://sequelize.org/docs/v6/core-concepts/model-basics/ Sequelize Models} related to Auth.js that will be created in your database.
     */
    models?: Partial<{
        User: ModelCtor<UserInstance>;
        Account: ModelCtor<AccountInstance>;
        Session: ModelCtor<SessionInstance>;
        VerificationToken: ModelCtor<VerificationTokenInstance>;
    }>;
}
export default function SequelizeAdapter(client: Sequelize, options?: SequelizeAdapterOptions): Adapter;
//# sourceMappingURL=index.d.ts.map