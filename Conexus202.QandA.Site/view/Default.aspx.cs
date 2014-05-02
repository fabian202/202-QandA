using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using IT_MATICA.QandA.Model.Service;

public partial class views_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        new QandAapi().Test();
    }
}