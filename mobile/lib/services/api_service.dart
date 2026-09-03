import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/trade.dart';

class ApiService {
  static String baseUrl = 'https://tradeaudit-backend-h3z4.onrender.com/api';

  static void updateBaseUrl(String newUrl) {
    baseUrl = newUrl;
  }

  Map<String, String> get _headers => {
    'Content-Type': 'application/json',
  };

  Future<Map<String, dynamic>> getAccountRaw() async {
    try {
      final response = await http
          .get(Uri.parse('$baseUrl/portfolio'), headers: _headers)
          .timeout(const Duration(seconds: 10));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
    } catch (e) {
      print('[ApiService] getAccountRaw error: $e');
    }
    return {};
  }

  Future<Map<String, dynamic>> getSummaryRaw() async {
    try {
      final response = await http
          .get(Uri.parse('$baseUrl/summary'), headers: _headers)
          .timeout(const Duration(seconds: 10));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
    } catch (e) {
      print('[ApiService] getSummaryRaw error: $e');
    }
    return {};
  }

  Future<List<Trade>> getOrders() async {
    try {
      final response = await http
          .get(Uri.parse('$baseUrl/orders'), headers: _headers)
          .timeout(const Duration(seconds: 10));
      if (response.statusCode == 200) {
        final List data = jsonDecode(response.body);
        return data.map((e) => Trade.fromAlpacaOrder(e)).toList();
      }
    } catch (e) {
      print('[ApiService] getOrders error: $e');
    }
    return [];
  }

  Future<List<Trade>> getTrades() async {
    try {
      final response = await http
          .get(Uri.parse('$baseUrl/trades'), headers: _headers)
          .timeout(const Duration(seconds: 10));
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final List tradesList = data['trades'] ?? [];
        return tradesList.map((e) => Trade.fromDbTrade(e)).toList();
      }
    } catch (e) {
      print('[ApiService] getTrades error: $e');
    }
    return [];
  }

  Future<List<Map<String, dynamic>>> getAuditLogs() async {
    try {
      final response = await http
          .get(Uri.parse('$baseUrl/audit'), headers: _headers)
          .timeout(const Duration(seconds: 10));
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final List logs = data['logs'] ?? [];
        return logs.cast<Map<String, dynamic>>();
      }
    } catch (e) {
      print('[ApiService] getAuditLogs error: $e');
    }
    return [];
  }

  Future<Map<String, String>> getExplanation(Trade trade, double portfolioValue) async {
    try {
      final response = await http
          .post(
        Uri.parse('$baseUrl/explain'),
        headers: _headers,
        body: jsonEncode({
          'symbol': trade.symbol,
          'side': trade.side.toLowerCase(),
          'qty': trade.qty,
          'price': trade.price,
          'total': trade.total,
          'status': trade.status.toLowerCase(),
          'portfolioValue': portfolioValue,
        }),
      )
          .timeout(const Duration(seconds: 15));
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return {
          'explanation': data['explanation'] ?? 'No explanation available.',
          'riskScore': data['riskScore'] ?? 'LOW',
        };
      }
    } catch (e) {
      print('[ApiService] getExplanation error: $e');
    }
    return {
      'explanation': 'AI explanation unavailable right now.',
      'riskScore': 'LOW',
    };
  }

  Future<String> askChat(String question) async {
    try {
      final response = await http
          .post(
        Uri.parse('$baseUrl/chat'),
        headers: _headers,
        body: jsonEncode({'question': question}),
      )
          .timeout(const Duration(seconds: 15));
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['answer'] ?? 'No response from AI.';
      }
    } catch (e) {
      print('[ApiService] askChat error: $e');
    }
    return 'Could not connect to AI service. Please check if the backend is running.';
  }
}
