# Contributing to Advanced Discord Selfbot

**Created by Sanyam Suyal**

Thank you for your interest in contributing to this educational Discord selfbot project! We welcome contributions from the community while maintaining the educational focus and responsible use of this software.

## 🤝 How to Contribute

### 1. Getting Started
- Fork the repository on GitHub
- Clone your fork to your local machine
- Install dependencies: `npm install`
- Create a new branch for your feature: `git checkout -b feature-name`

### 2. Making Changes
- Follow the existing code style and structure
- Ensure all new commands include proper error handling
- Test your changes thoroughly before submitting
- Keep commits focused and write clear commit messages

### 3. Submitting Changes
- Push your changes to your fork
- Create a Pull Request with a clear description
- Reference any related issues
- Be responsive to feedback and reviews

## 📋 Contribution Guidelines

### Code Standards
- **ES6+ JavaScript**: Use modern JavaScript features
- **Modular Structure**: Follow the existing command structure
- **Error Handling**: All commands must include try-catch blocks
- **Comments**: Add comments for complex logic
- **Consistency**: Match the existing code style

### Command Development
When creating new commands, follow this template:

```javascript
export default {
  name: 'commandname',
  description: 'Clear description of what the command does',
  category: 'utility', // utility, fun, tools, social, developer, custom
  aliases: ['alias1', 'alias2'],
  cooldown: 3, // seconds
  usage: 'commandname [arguments]',

  async execute(client, message, args) {
    try {
      // Your command logic here
      await message.channel.send('Response message');
    } catch (error) {
      console.error(`Command ${this.name} failed:`, error);
      await message.channel.send('❌ Command failed. Please try again.');
    }
  }
};
```

### Testing Requirements
- Test commands in different scenarios
- Verify error handling works correctly
- Ensure cooldowns function properly
- Test with different user permissions
- Verify memory usage and performance

## 🚫 What NOT to Contribute

### Prohibited Content
- Commands that promote harassment or abuse
- Features that violate Discord's API guidelines excessively
- Malicious or harmful functionality
- Commands that access sensitive user data
- Content that promotes illegal activities

### Code Quality Issues
- Hardcoded tokens or sensitive information
- Commands without proper error handling
- Code that doesn't follow the project structure
- Features that could cause account bans
- Unoptimized or resource-heavy operations

## 🎯 Priority Areas for Contribution

### High Priority
- Bug fixes and stability improvements
- Performance optimizations
- Better error handling and user feedback
- Documentation improvements
- Security enhancements

### Medium Priority
- New utility commands
- Enhanced existing features
- Code refactoring and cleanup
- Additional customization options
- Cross-platform compatibility improvements

### Low Priority
- New entertainment commands
- UI/UX improvements for console output
- Additional configuration options
- Extended logging capabilities

## 🐛 Reporting Issues

### Bug Reports
When reporting bugs, please include:
- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual behavior**
- **Environment details** (Node.js version, OS, etc.)
- **Error messages** or logs
- **Screenshots** if applicable

### Feature Requests
For new feature requests:
- Explain the **use case** and benefits
- Describe the **expected functionality**
- Consider **implementation complexity**
- Ensure it aligns with **educational purposes**
- Check for **existing similar features**

## 📚 Development Setup

### Prerequisites
- Node.js 16.0.0 or higher
- Git for version control
- Code editor (VS Code recommended)
- Discord account for testing (use secondary account)

### Local Development
1. Clone your fork
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure
4. Start development server: `npm run dev`
5. Test your changes thoroughly

### Code Style
- Use 2 spaces for indentation
- Use semicolons consistently
- Use meaningful variable names
- Keep functions focused and small
- Add JSDoc comments for complex functions

## 🏆 Recognition

### Contributors
All contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special thanks in commit messages

### Maintainers
Active and helpful contributors may be invited to become maintainers with additional responsibilities and privileges.

## 📞 Getting Help

### Support Channels
- **GitHub Issues**: Technical problems and bugs
- **GitHub Discussions**: General questions and ideas
- **Documentation**: Check README.md and code comments
- **Code Review**: Learn from existing command implementations

### Best Practices
- Search existing issues before creating new ones
- Be respectful and constructive in discussions
- Provide detailed information when asking for help
- Help others when you can share knowledge

## 📋 Code of Conduct

### Our Standards
- **Respectful**: Treat all contributors with respect
- **Educational**: Focus on learning and teaching
- **Responsible**: Consider the ethical implications
- **Collaborative**: Work together constructively
- **Professional**: Maintain high standards

### Unacceptable Behavior
- Harassment or discrimination
- Promoting malicious use of the software
- Sharing tokens or sensitive information
- Spamming or low-quality contributions
- Disrespectful or offensive language

---

## 🙏 Thank You

Thank you for contributing to this educational project created by **Sanyam Suyal**. Your contributions help make this a valuable learning resource for the Discord development community.

Remember: This project is for educational purposes only. Always use Discord selfbots responsibly and be aware of the Terms of Service implications.

**Happy Contributing! 🚀**
