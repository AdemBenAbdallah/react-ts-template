class Config {
  API_URL = "http://localhost:8000";

  private static instance: Config;
  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
}

export default Config;
