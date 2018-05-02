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
            var button = FindViewById<Button>(Resource.Id.MyButton);
            var label = FindViewById<TextView>(Resource.Id.textView1);

            button.Click += delegate
            {
                label.Text = $"{count++} clicks";
            };
        }
        protected override Dialog OnCreateDialog(int id)
        {
            return base.OnCreateDialog(id);
        }
        protected override void OnStop()
        {
            base.OnStop();
        }
    }
}

