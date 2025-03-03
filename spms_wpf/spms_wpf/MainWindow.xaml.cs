using System.Windows;
using System.Windows.Controls;

namespace spms_wpf
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void AddCourse_Click(object sender, RoutedEventArgs e)
        {
            PageContent.Content = new AddCourseControl();
        }

        private void UpdateCourse_Click(object sender, RoutedEventArgs e)
        {
            PageContent.Content = new UpdateCourseControl();
        }

        private void StudentView_Click(object sender, RoutedEventArgs e)
        {
            PageContent.Content = new StudentViewControl();
        }
    }
}
