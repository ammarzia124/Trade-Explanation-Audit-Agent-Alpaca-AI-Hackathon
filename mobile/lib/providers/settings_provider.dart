import 'package:flutter/foundation.dart';
import '../services/api_service.dart';

class SettingsProvider with ChangeNotifier {
  String baseUrl = 'https://tradeaudit-backend-h3z4.onrender.com/';
  static String apiKey = 'PKK5QBBLH5ZQ3F6PHWWBJUJG55';
  static String apiSecret = '2by2zxAtz5hNNQd66sahzGg2rbK33UnvG4hcgM4te325';

  void updateBaseUrl(String newUrl) {
    baseUrl = newUrl;
    ApiService.updateBaseUrl(newUrl);
    notifyListeners();
  }

  void updateCredentials(String key, String secret) {
    apiKey = key;
    apiSecret = secret;
    ApiService.updateCredentials(key, secret);
    notifyListeners();
  }
}