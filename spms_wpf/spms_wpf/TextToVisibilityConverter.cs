using System;
using System.Globalization;
using System.Windows;
using System.Windows.Data;

namespace spms_wpf
{
    public class TextToVisibilityConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (string.IsNullOrEmpty(value as string))
                return Visibility.Visible; // Show placeholder when TextBox is empty
            return Visibility.Collapsed;   // Hide placeholder when TextBox has text
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
