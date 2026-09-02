class ApiConfig {
  static const String defaultBaseUrl = 'http://localhost:5000';
  static const String wsBaseUrl = 'ws://localhost:5000';

  static String _baseUrl = defaultBaseUrl;

  static String get baseUrl => _baseUrl;

  static void setBaseUrl(String url) {
    _baseUrl = url;
  }

  static const String tradesEndpoint = '/api/trades';
  static const String auditEndpoint = '/api/audit';
  static const String chatEndpoint = '/api/chat';
  static const String alpacaEndpoint = '/api/alpaca';
}
