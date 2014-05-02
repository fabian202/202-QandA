namespace IT_MATICA.QandA.Model.Business.BussinesLogic
{
    using System.Collections.Generic;
    using Entities;
    using ResourceAcces.Dao;

    internal class QuestionBl
    {
        internal IList<Question> GetQuestions()
        {
            return new QuestionDao().GetQuestions();
        }
    }
}
