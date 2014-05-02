namespace IT_MATICA.QandA.Model.Service
{
    using System.Collections.Generic;
    using System.ServiceModel;
    using System.ServiceModel.Web;
    using Business.Entities;

     [ServiceContract]
    public interface IQandAapi
    {
        [OperationContract]
        [WebInvoke(Method = "GET",
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.WrappedRequest,
            UriTemplate = "/test")]
        string Test();

         [OperationContract]
         [WebInvoke(Method = "GET",
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.WrappedRequest,
             UriTemplate = "/questions")]
         IList<Question> GetQuestions();

         [OperationContract]
         [WebInvoke(Method = "POST",
             ResponseFormat = WebMessageFormat.Json,
             RequestFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.WrappedRequest,
             UriTemplate = "/participant")]
         int SaveParticipant(Participant participant);

         [OperationContract]
         [WebInvoke(Method = "POST",
             ResponseFormat = WebMessageFormat.Json,
             RequestFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.WrappedRequest,
             UriTemplate = "/answers")]
         bool SaveAnswers(IList<Answer> answers);

         [OperationContract]
         [WebInvoke(Method = "GET",
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.WrappedRequest,
             UriTemplate = "/report")]
         IList<Participant> GetReport();
    }
}