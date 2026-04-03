/**
 * Logger Utility
 */

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

export const logger = {
  info: (message, data = null) => {
    console.log(`${colors.cyan}[INFO]${colors.reset} ${message}`, data || '');
  },

  success: (message, data = null) => {
    console.log(`${colors.green}[SUCCESS]${colors.reset} ${message}`, data || '');
  },

  warn: (message, data = null) => {
    console.warn(`${colors.yellow}[WARN]${colors.reset} ${message}`, data || '');
  },

  error: (message, data = null) => {
    console.error(`${colors.red}[ERROR]${colors.reset} ${message}`, data || '');
  },

  debug: (message, data = null) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${colors.blue}[DEBUG]${colors.reset} ${message}`, data || '');
    }
  }
};
