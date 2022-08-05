interface ConfigInterface {
  baseUrl: string;
}

const isDev = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const DevConfig: ConfigInterface = {
  baseUrl: "http://localhost:3333/api",
};

const ProdConfig: ConfigInterface = {
  baseUrl: "https://api.simpleissues.new.afetiveau.com/api",
};

const Config = isDev() ? DevConfig : ProdConfig;

export default Config;
