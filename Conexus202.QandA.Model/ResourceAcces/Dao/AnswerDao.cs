namespace IT_MATICA.QandA.Model.ResourceAcces.Dao
{
    using System.Collections.Generic;
    using System.Text;
    using Business.Entities;
    using Helper;
    using Util;

    internal class AnswerDao
    {
        internal bool SaveAnswers(IList<Answer> answers)
        {
            SQLiteDatabase db = new SQLiteDatabase();

            StringBuilder sql = new StringBuilder(Constants.SqlSaveAnswers);

            foreach (Answer answer in answers) 
            {
                sql.AppendFormat("({0},{1},{2}),", answer.QuestionId, answer.ParticipantId, answer.IsCorrect ? 1: 0);
            }
            
            return (db.ExecuteNonQuery(sql.ToString().TrimEnd(',')) > 0);
        }
    }
}
