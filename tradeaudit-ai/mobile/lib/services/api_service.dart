import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/api_config.dart';
import '../models/trade.dart';
import '../models/audit_log.dart';

class ApiService {
  final http.Client _client;

  ApiService({http.Client? client}) : _client = client ?? http.Client();

  Future<Map<String, String>> get _headers async => {
        'Content-Type': 'application/json',
      };

  Future<List<Trade>> getTrades({int limit = 50}) async {
    final response = await _client.get(
      Uri.parse('${ApiConfig.baseUrl}${ApiConfig.tradesEndpoint}?limit=$limit'),
      headers: await _headers,
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return (data['trades'] as List).map((t) => Trade.fromJson(t)).toList();
    }
    throw Exception('Failed to fetch trades');
  }

  Future<Trade> analyzeTrade(String tradeId) async {
    final response = await _client.post(
      Uri.parse('${ApiConfig.baseUrl}${ApiConfig.tradesEndpoint}/$tradeId/analyze'),
      headers: await _headers,
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return Trade.fromJson(data['trade']);
    }
    throw Exception('Failed to analyze trade');
  }

  Future<List<AuditLog>> getAuditLogs({int limit = 100}) async {
    final response = await _client.get(
      Uri.parse('${ApiConfig.baseUrl}${ApiConfig.auditEndpoint}?limit=$limit'),
      headers: await _headers,
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return (data['logs'] as List).map((l) => AuditLog.fromJson(l)).toList();
    }
    throw Exception('Failed to fetch audit logs');
  }

  Future<String> sendChat(String message) async {
    final response = await _client.post(
      Uri.parse('${ApiConfig.baseUrl}${ApiConfig.chatEndpoint}'),
      headers: await _headers,
      body: jsonEncode({'message': message}),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return data['response'];
    }
    throw Exception('Failed to send chat message');
  }

  Future<Map<String, dynamic>> getAccount() async {
    final response = await _client.get(
      Uri.parse('${ApiConfig.baseUrl}${ApiConfig.alpacaEndpoint}/account'),
      headers: await _headers,
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return data['account'];
    }
    throw Exception('Failed to fetch account');
  }
}
