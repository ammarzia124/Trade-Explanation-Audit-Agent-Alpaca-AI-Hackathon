import 'package:flutter/foundation.dart';
import '../services/api_service.dart';

class SettingsProvider with ChangeNotifier {
  String baseUrl = 'https://tradeaudit-backend-h3z4.onrender.com/api';

  void updateBaseUrl(String newUrl) {
    baseUrl = newUrl;
    ApiService.updateBaseUrl(newUrl);
    notifyListeners();
  }
}
