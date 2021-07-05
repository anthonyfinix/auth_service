export interface IConfig {
    env: string
    port: number,
    default_user_verification_state: boolean,
    default_user_role: string,
    mongooseOptions: {
        useNewUrlParser: boolean,
        useUnifiedTopology: boolean,
        useFindAndModify: boolean
    },
    amqpsUrl: string,
    express: {
        default_url_encoding_extended: boolean
    },
    passwordHashRound: number,
    userServer: {
        host: string,
        protocol: string
        port: number
    },
    jwt: {
        secret: string
    }

}
class Configuration implements IConfig {
    env: string = "development";
    port: number = 3100;
    default_user_verification_state: boolean = false;
    default_user_role: string = "admin";
    mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
    amqpsUrl: string = "amqp://localhost"
    express = {
        default_url_encoding_extended: true
    }
    userServer = {
        host: "localhost",
        protocol: "http",
        port: 3002
    }
    passwordHashRound: number = 5
    jwt = {
        secret: "secret",
        expires: 5000
    }
    setConfiguration(options: IConfig) {
        if (options.port) this.port = options.port;
        if (options.env) this.env = options.env;
        if (options.userServer) {
            if (options.userServer.host) this.userServer.host = options.userServer.host
            if (options.userServer.protocol) this.userServer.protocol = options.userServer.protocol
            if (options.userServer.port) this.userServer.port = options.userServer.port
        }
    }

}

let configuration = new Configuration();
export default configuration;