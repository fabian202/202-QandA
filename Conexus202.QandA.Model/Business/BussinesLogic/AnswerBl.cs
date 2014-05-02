namespace IT_MATICA.QandA.Model.Business.BussinesLogic
{
    using System.Collections.Generic;
    using Entities;
    using ResourceAcces.Dao;

    internal class AnswerBl
    {
        internal bool SaveAnswers(IList<Answer> answers)
        {
            return new AnswerDao().SaveAnswers(answers);
        }
    }
}
