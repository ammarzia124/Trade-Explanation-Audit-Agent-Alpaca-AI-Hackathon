import 'dart:async';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'api_service.dart';

class NotificationService {
  static final NotificationService _instance = NotificationService._internal();
  factory NotificationService() => _instance;
  NotificationService._internal();

  final FlutterLocalNotificationsPlugin _plugin = FlutterLocalNotificationsPlugin();
  final ApiService _apiService = ApiService();

  Timer? _pollTimer;
  int _lastTradeCount = -1;
  bool _isPolling = false;

  Future<void> init() async {
    const androidSettings = AndroidInitializationSettings('@mipmap/ic_launcher');
    const initSettings = InitializationSettings(android: androidSettings);
    await _plugin.initialize(initSettings);
  }

  Future<void> _showNotification(String title, String body) async {
    const androidDetails = AndroidNotificationDetails(
      'trade_channel',
      'Trade Alerts',
      channelDescription: 'Notifications for new trades',
      importance: Importance.high,
      priority: Priority.high,
    );
    const details = NotificationDetails(android: androidDetails);
    await _plugin.show(0, title, body, details);
  }

  void startPolling() {
    _pollTimer?.cancel();
    _isPolling = true;
    _pollTimer = Timer.periodic(const Duration(seconds: 30), (_) async {
      if (!_isPolling) return;
      try {
        final trades = await _apiService.getOrders();
        if (_lastTradeCount != -1 && trades.length > _lastTradeCount) {
          final newest = trades.first;
          await _showNotification(
            'New trade: ${newest.side} ${newest.symbol} \$${newest.total.toStringAsFixed(0)}',
            'AI explanation ready',
          );
        }
        _lastTradeCount = trades.length;
      } catch (e) {
        print('[NotificationService] Polling error: $e');
      }
    });
  }

  void stopPolling() {
    _isPolling = false;
    _pollTimer?.cancel();
    _pollTimer = null;
  }
}
