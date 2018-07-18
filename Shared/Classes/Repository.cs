using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq.Expressions;

namespace Shared
{
    public abstract class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected IDbConnection database;

        protected Repository(string connectionString)
        {
            database = new SqlConnection(connectionString);
        }

        protected Repository(IDbConnection database)
        {
            this.database = database;
        }

        public abstract TEntity Add(TEntity entity);
        public abstract IEnumerable<TEntity> AddRange(IEnumerable<TEntity> entities);
        public abstract void Dispose();
        public abstract IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate);
        public abstract TEntity Get(int id);
        public abstract IEnumerable<TEntity> GetAll();
        public abstract TEntity Remove(TEntity entity);
        public abstract IEnumerable<TEntity> RemoveRange(IEnumerable<TEntity> entities);
    }
}
