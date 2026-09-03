import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/trade.dart';
import '../data/mock_data.dart';

class ApiService {
  static String baseUrl = 'https://tradeaudit-backend-h3z4.onrender.com/api';
  static String apiKey = 'PKK5QBBLH5ZQ3F6PHWWBJUJG55';
  static String apiSecret = '2by2zxAtz5hNNQd66sahzGg2rbK33UnvG4hcgM4te325';

  static void updateBaseUrl(String newUrl) {
    baseUrl = newUrl;
  }

  static void updateCredentials(String key, String secret) {
    apiKey = key;
    apiSecret = secret;
  }

  Map<String, String> get _headers => {
    'Content-Type': 'application/json',
    'X-API-Key': apiKey,
    'X-API-Secret': apiSecret,
  };

  // Raw Alpaca account data: equity, cash, buying_power
  Future<Map<String, dynamic>> getAccountRaw() async {
    try {
      final response = await http
          .get(Uri.parse('$baseUrl/portfolio'), headers: _headers)
          .timeout(const Duration(seconds: 10));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
    } catch (_) {}
    return {};
  }

  // total, filled, blocked, highRisk, totalValue
  Future<Map<String, dynamic>> getSummaryRaw() async {
    try {
      final response = await http
          .get(Uri.parse('$baseUrl/summary'), headers: _headers)
          .timeout(const Duration(seconds: 10));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
    } catch (_) {}
    return {};
  }

  Future<List<Trade>> getOrders() async => _getTradeList('/orders');
  Future<List<Trade>> getTrades() async => _getTradeList('/trades');

  Future<List<Trade>> _getTradeList(String endpoint) async {
    try {
      final response = await http
          .get(Uri.parse('$baseUrl$endpoint'), headers: _headers)
          .timeout(const Duration(seconds: 10));
      if (response.statusCode == 200) {
        final List data = jsonDecode(response.body);
        return data.map((e) => Trade.fromJson(e)).toList();
      }
    } catch (_) {}
    return MockData.getMockTrades();
  }

  // Body: symbol, side, qty, price, total, status, portfolioValue
  // Response: { explanation, riskScore }
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
    } catch (_) {}
    return {
      'explanation': 'AI explanation unavailable right now (backend not reachable).',
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
    } catch (_) {}
    return 'Mock response for: "$question" (backend not reachable).';
  }
}