import 'package:flutter_test/flutter_test.dart';
import 'package:tradeaudit_mobile/models/trade.dart';

void main() {
  group('Trade Model', () {
    test('should parse from JSON correctly', () {
      final json = {
        'id': 'test-123',
        'symbol': 'AAPL',
        'side': 'buy',
        'qty': '10',
        'filled_avg_price': '150.00',
        'status': 'filled',
        'order_type': 'market',
        'time_in_force': 'day',
        'filled_at': '2024-01-15T10:30:00Z',
        'ai_explanation': 'This is a buy order for 10 shares of AAPL',
        'risk_score': 3,
        'risk_category': 'low',
        'created_at': '2024-01-15T10:30:00Z',
      };

      final trade = Trade.fromJson(json);

      expect(trade.id, 'test-123');
      expect(trade.symbol, 'AAPL');
      expect(trade.side, 'buy');
      expect(trade.qty, '10');
      expect(trade.filledAvgPrice, '150.00');
      expect(trade.status, 'filled');
      expect(trade.riskScore, 3);
      expect(trade.riskCategory, 'low');
      expect(trade.isBuy, true);
      expect(trade.hasAnalysis, true);
    });

    test('should handle nullable fields', () {
      final json = {
        'id': 'test-456',
        'symbol': 'TSLA',
        'side': 'sell',
        'qty': '5',
        'status': 'open',
        'created_at': '2024-01-15T10:30:00Z',
      };

      final trade = Trade.fromJson(json);

      expect(trade.filledAvgPrice, null);
      expect(trade.aiExplanation, null);
      expect(trade.riskScore, null);
      expect(trade.isBuy, false);
      expect(trade.hasAnalysis, false);
    });
  });
}
