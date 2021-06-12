using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GetNewGamesAPI.Models
{
    public class SaleRepositorio
    {


        private MySqlConnection Connect()
        {
            string server = "server=127.0.0.1;";
            string port = "port=3306;";
            string database = "database=gngames;";
            string usuario = "uid=root;";
            string password = "pwd=;";

            string connString = server + port + database + usuario + password;
            MySqlConnection con = new MySqlConnection(connString);
            return con;
        }
        internal List<Sale> Retrive()
        {
            List<Sale> mercados = new List<Sale>();
            MySqlConnection con = Connect();
            MySqlCommand comand = con.CreateCommand();
            comand.CommandText = "SELECT * FROM `Sales`";
            Sale ap = null;
            try
            {
                con.Open();
                MySqlDataReader res = comand.ExecuteReader();

                if (res.Read())
                {
                    ap = new Sale(res.GetInt32(0), res.GetInt32(1), res.GetInt32(2), res.GetDecimal(3) , res.GetString(4));
                    mercados.Add(ap);
                }

            }
            catch (Exception e)
            {


            }

            con.Close();
            return mercados;
        }






        internal List<Sale> Retrive2(int id)
        {
            List<Sale> mercados = new List<Sale>();
            MySqlConnection con = Connect();
            MySqlCommand comand = con.CreateCommand();
            comand.CommandText = "SELECT* FROM `Sale` WHERE `USUARIO_EMAIL` = '" + id + "'";
            Sale ap = null;
            try
            {
                con.Open();
                MySqlDataReader res = comand.ExecuteReader();

                if (res.Read())
                {
                    ap = new Sale(res.GetInt32(0), res.GetInt32(1), res.GetInt32(2), res.GetDecimal(3), res.GetString(4));
                    mercados.Add(ap);
                }

            }
            catch (Exception e)
            {
            }

            con.Close();
            return mercados;
        }


        /*

        internal void Save(Sale a)
        {
            //Sale a = new Sale(23, "2020-11-05 12:22:54", 1, 23, "123", "123");
            MySqlConnection con = Connect();
            MySqlCommand command = con.CreateCommand();
            command.CommandText = "INSERT INTO `Sale` (`idSale`, `name`, `pasword`, `admin`) VALUES ('" + a.idSale + "' , '" + a.name + "' ,'" + a.pasword + "' ,'" + a.admin + "' );";

            try
            {
                con.Open();
                command.ExecuteNonQuery();
                con.Close();
            }
            catch (Exception e)
            {
                Debug.WriteLine("Error Insert Sale");
            }
        }

    */



    }
}