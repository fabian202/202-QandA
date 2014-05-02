namespace IT_MATICA.QandA.Model.Business.BussinesLogic
{
    using System.Collections.Generic;
    using Entities;
    using ResourceAcces.Dao;


    class ParticipantBl
    {
        internal int SaveParticipant(Participant participant)
        {
            return new ParticipantDao().SaveParticipant(participant);
        }

        internal IList<Participant> GetReport()
        {
            return new ParticipantDao().GetReport();

        }
    }
}
