// TEMPLATE: Generic utility functions for common operations
// CUSTOMIZE: Replace this entire file with your application-specific utilities

// TEMPLATE: Result interface for processing operations
// CUSTOMIZE: Update this interface to match your application's data structure
export interface ProcessResult {
  input: string;          // CUSTOMIZE: Your input data type
  output: string;         // CUSTOMIZE: Your output data type
  format: FormatType;     // CUSTOMIZE: Your format options
  timestamp: Date;        // KEEP: Useful for tracking when processing occurred
  error?: string;         // KEEP: Error handling
}

// TEMPLATE: Format types for output styling
// CUSTOMIZE: Replace these with your application's format options
export type FormatType = 'default' | 'compact' | 'detailed';

// TEMPLATE: Main utility class for application logic
// CUSTOMIZE: Replace methods with your application-specific functions
export class Utils {
  // TEMPLATE: Main processing function - THIS IS THE CORE LOGIC TO REPLACE
  // CUSTOMIZE: Replace this entire method with your application's main processing logic
  public static processInput(input: string, format: FormatType = 'default'): ProcessResult {
    try {
      // TEMPLATE: Basic input validation
      // CUSTOMIZE: Add your specific validation logic
      if (!input.trim()) {
        return {
          input: '',
          output: '',
          format,
          timestamp: new Date(),
          error: 'Input cannot be empty' // CUSTOMIZE: Your error message
        };
      }

      // TEMPLATE: Format-based processing
      // CUSTOMIZE: Replace this switch statement with your processing logic
      let output = '';
      
      switch (format) {
        case 'compact':
          output = this.formatCompact(input);    // CUSTOMIZE: Your compact format
          break;
        case 'detailed':
          output = this.formatDetailed(input);   // CUSTOMIZE: Your detailed format
          break;
        case 'default':
        default:
          output = this.formatDefault(input);    // CUSTOMIZE: Your default format
          break;
      }

      return {
        input,
        output,
        format,
        timestamp: new Date()
      };
    } catch (error) {
      // KEEP: Error handling pattern
      return {
        input,
        output: '',
        format,
        timestamp: new Date(),
        error: `Error processing input: ${error}` // CUSTOMIZE: Your error message format
      };
    }
  }

  // TEMPLATE: Default format processing
  // CUSTOMIZE: Replace with your default output format logic
  private static formatDefault(input: string): string {
    return `Processed: ${input} (${input.length} characters)`; // CUSTOMIZE: Your default output
  }

  // TEMPLATE: Compact format processing  
  // CUSTOMIZE: Replace with your compact output format logic
  private static formatCompact(input: string): string {
    return `${input} [${input.length}]`; // CUSTOMIZE: Your compact output
  }

  // TEMPLATE: Detailed format processing
  // CUSTOMIZE: Replace with your detailed output format logic
  private static formatDetailed(input: string): string {
    // TEMPLATE: Example detailed processing
    const wordCount = input.trim().split(/\s+/).length;
    const charCount = input.length;
    const timestamp = new Date().toLocaleTimeString();
    
    // CUSTOMIZE: Replace this entire return with your detailed output
    return `Input: "${input}"
Length: ${charCount} characters
Words: ${wordCount}
Processed at: ${timestamp}`;
  }

  // TEMPLATE: Get available options for autocomplete dropdown
  // CUSTOMIZE: Replace with your application's available options/settings
  public static getAvailableOptions(): string[] {
    return [
      'Option A',        // CUSTOMIZE: Replace with your options
      'Option B', 
      'Option C',
      'Custom Option',
      'Advanced Setting',
      'Debug Mode',
      'Verbose Output',
      'Quick Process',
      'Batch Mode',
      'Export Data'
    ];
  }

  // TEMPLATE: Validate option name
  // CUSTOMIZE: Replace with your validation logic
  public static isValidOption(option: string): boolean {
    const availableOptions = this.getAvailableOptions();
    // CUSTOMIZE: Update validation rules for your application
    return availableOptions.includes(option) || option.trim().length > 0;
  }

  // KEEP: Generate a unique ID for elements - useful for dynamic content
  public static generateId(prefix: string = 'item'): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // KEEP: Safely get element by ID with type checking - useful utility
  public static getElementById<T extends HTMLElement>(id: string): T | null {
    const element = document.getElementById(id);
    return element as T | null;
  }

  // KEEP: Debounce function for performance optimization
  // Useful for preventing excessive API calls or processing
  public static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: number;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // KEEP: Copy text to clipboard with fallback for older browsers
  // Works with the copy button functionality in main.ts
  public static async copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
      }
    } catch (error) {
      console.error('Failed to copy text:', error);
      return false;
    }
  }

  // KEEP: Format date for display - useful utility function
  // CUSTOMIZE: Add your own date formatting if needed
  public static formatDate(date: Date, format: 'short' | 'long' | 'time' = 'short'): string {
    switch (format) {
      case 'long':
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      case 'time':
        return date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
      case 'short':
      default:
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
    }
  }
}