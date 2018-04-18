using Android.App;
using Android.Widget;
using Android.OS;

namespace TPOT_Mobile
{
    [Activity(Label = "TPOT_Mobile", MainLauncher = true)/*, Icon = "@drawable/icon"*/]
    public class MainActivity : Activity
    {
        int count = 0;
        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);
            SetContentView(Resource.Layout.Main);

            //get button from the layout resource:
            //Button button = FindViewById<Button>(Resource.Id.MyButton);
            //button.Click += delegate
            //{
            //    button.Text = $"{count++} clicks";
            //};
        }
    }
}

