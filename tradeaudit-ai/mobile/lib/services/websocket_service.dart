import 'dart:async';
import 'dart:convert';
import 'package:web_socket_channel/web_socket_channel.dart';
import '../config/api_config.dart';

class WebSocketService {
  WebSocketChannel? _channel;
  final _controller = StreamController<Map<String, dynamic>>.broadcast();

  Stream<Map<String, dynamic>> get stream => _controller.stream;

  void connect() {
    final wsUrl = '${ApiConfig.wsBaseUrl}/ws/trades';
    _channel = WebSocketChannel.connect(Uri.parse(wsUrl));

    _channel!.stream.listen(
      (data) {
        final message = jsonDecode(data);
        _controller.add(message);
      },
      onError: (error) {
        print('WebSocket error: $error');
        _reconnect();
      },
      onDone: () {
        _reconnect();
      },
    );

    _channel!.sink.add(jsonEncode({
      'type': 'subscribe_trades',
      'symbols': ['*'],
    }));
  }

  void _reconnect() {
    Future.delayed(const Duration(seconds: 5), () {
      connect();
    });
  }

  void disconnect() {
    _channel?.sink.close();
    _controller.close();
  }
}
