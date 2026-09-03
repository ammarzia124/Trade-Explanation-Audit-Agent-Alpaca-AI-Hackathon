import 'package:flutter/material.dart';
import '../services/api_service.dart';

class ChatMessage {
  final String text;
  final bool isUser;
  ChatMessage(this.text, this.isUser);
}

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final ApiService _apiService = ApiService();
  final TextEditingController _controller = TextEditingController();
  final List<ChatMessage> _messages = [];
  bool _isSending = false;

  final List<String> _suggestions = [
    'Why did we buy AAPL?',
    'Any risky trades?',
    'Explain the last trade',
  ];

  Future<void> _sendMessage(String text) async {
    if (text.trim().isEmpty) return;
    setState(() {
      _messages.add(ChatMessage(text, true));
      _isSending = true;
    });
    _controller.clear();

    final answer = await _apiService.askChat(text);

    setState(() {
      _messages.add(ChatMessage(answer, false));
      _isSending = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('AI Trade Assistant', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            if (_messages.isEmpty)
              const Expanded(
                child: Center(
                  child: Text(
                    'Ask the AI about your trading activity.',
                    style: TextStyle(color: Colors.white54),
                    textAlign: TextAlign.center,
                  ),
                ),
              )
            else
              Expanded(
                child: ListView.builder(
                  itemCount: _messages.length + (_isSending ? 1 : 0),
                  itemBuilder: (context, index) {
                    if (index == _messages.length) {
                      return _buildBubble('Thinking...', false);
                    }
                    final msg = _messages[index];
                    return _buildBubble(msg.text, msg.isUser);
                  },
                ),
              ),
            const SizedBox(height: 10),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: _suggestions.map((s) {
                return ActionChip(
                  label: Text(s, style: const TextStyle(color: Colors.white70, fontSize: 12)),
                  backgroundColor: const Color(0xFF161B22),
                  side: const BorderSide(color: Colors.white10),
                  onPressed: () => _sendMessage(s),
                );
              }).toList(),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    style: const TextStyle(color: Colors.white),
                    decoration: InputDecoration(
                      hintText: 'Ask a question...',
                      hintStyle: const TextStyle(color: Colors.white38),
                      filled: true,
                      fillColor: const Color(0xFF161B22),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                    ),
                    onSubmitted: _sendMessage,
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  icon: const Icon(Icons.send, color: Colors.blueAccent),
                  onPressed: () => _sendMessage(_controller.text),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBubble(String text, bool isUser) {
    return Align(
      alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 6),
        padding: const EdgeInsets.all(12),
        constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.75),
        decoration: BoxDecoration(
          color: isUser ? Colors.blueAccent.withOpacity(0.2) : const Color(0xFF161B22),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.white10),
        ),
        child: Text(text, style: const TextStyle(color: Colors.white, height: 1.4)),
      ),
    );
  }
}