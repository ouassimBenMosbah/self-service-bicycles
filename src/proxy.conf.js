const PROXY_CONFIG = [
    {
        context: ["/station_status.json", "/station_information.json"],
        target: "http://192.168.0.206:8080/gbfs/en/",
        secure: false,
        changeOrigin: true
    }
];

module.exports = PROXY_CONFIG;
