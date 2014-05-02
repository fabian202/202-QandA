using System;
using System.Configuration;
using System.IO;

namespace IT_MATICA.QandA.Model.Util
{
    public class CreateLogFiles
    {
        private string sLogFormat;
        private string sErrorTime;


        public CreateLogFiles()
        {
            //sLogFormat used to create log files format :
            // dd/mm/yyyy hh:mm:ss AM/PM ==> Log Message
            sLogFormat = DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToLongTimeString() + " ==> ";

            //this variable used to create log filename format "
            //for example filename : ErrorLogYYYYMMDD
            string sYear = DateTime.Now.Year.ToString();
            string sMonth = DateTime.Now.Month.ToString();
            string sDay = DateTime.Now.Day.ToString();
            sErrorTime = sYear + sMonth + sDay + ".txt";
        }

        public void ErrorLog(string sErrMsg)
        {

            StreamWriter sw = new StreamWriter(ConfigurationManager.AppSettings["logPath"] + sErrorTime, true);
       
            sw.WriteLine(sLogFormat + "Info: " + sErrMsg);
            sw.Flush();
            sw.Close();                  
        }
    }
}
