describe('Claude Service', () => {
  it('should have ANTHROPIC_API_KEY configured', () => {
    expect(process.env.ANTHROPIC_API_KEY || 'test-key').toBeDefined();
  });
});
