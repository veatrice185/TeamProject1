package model;

import java.sql.*;
import java.util.ArrayList;

import beans.RecommendMusic;
import beans.user;
import beans.playlist;
import model.DbManager;

public class DbManager {
	private String dburl = "";
	private String dbuser = "";
	private String dbpass = "";
	
	public void setDbUrl(String url) {
		dburl = url;
	}
	public String getDbUrl() {
		return dburl;
	}
	public void setDbUser(String user) {
		dbuser = user;
	}
	public String getDbUser() {
		return dbuser;
	}
	public void setDbPass(String pass) {
		dbpass = pass;
	}
	public String getDbPass () {
		return dbpass;
	}
	public Connection getConnection() {
		Connection conn = null;
		try {
			conn = DriverManager.getConnection(getDbUrl(),getDbUser(),getDbPass());			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return conn;
	}	
	public void closeConnection(Connection conn) {
		if(conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	public ArrayList<RecommendMusic> getRecommendMusic(){
		ArrayList<RecommendMusic> list = new ArrayList<RecommendMusic>();

		Connection conn = getConnection();
		if(conn != null) {
			ResultSet rs = null;
			PreparedStatement ps = null;
			try {
				String sqlQuery = "SELECT * from music";
				ps = conn.prepareStatement(sqlQuery);
				rs = ps.executeQuery();
				while(rs.next()) {
					RecommendMusic tmp = new RecommendMusic();
					tmp.setTitle(rs.getString("title"));
					tmp.setSinger(rs.getString("singer"));
					tmp.setUrl(rs.getString("url"));
					tmp.setSourceType(rs.getInt("sourceType"));
					tmp.setMusicId(rs.getInt("musicId"));
					tmp.setImage(rs.getString("image"));
					list.add(tmp);
				}
			} catch(SQLException e) {
				e.printStackTrace();
			}
			finally {
				try {
					rs.close();
					ps.close();
				} catch (SQLException ex) {
					ex.printStackTrace();
				}
				closeConnection(conn);	
			}
		}
		return list;
	}
	public user getUser(String email){
		user user = null;
		Connection conn = getConnection();
		
		if(conn != null){
			ResultSet rs = null;
			PreparedStatement ps = null;
			try {
				String sqlQuery = "SELECT * FROM user WHERE email=" + "'" + email + "'";
				ps = conn.prepareStatement(sqlQuery);
				rs = ps.executeQuery();
				
				while(rs.next()){					
					user = new user();
					user.setUserId(rs.getInt("userId"));
					user.setEmail(rs.getString("email"));
					user.setPassword(rs.getString("password"));
					user.setLastLogin(rs.getDate("lastLogin"));
				}
			}
			catch(SQLException e){
				e.printStackTrace();
			}
			finally	{
				try	{
					rs.close();
					ps.close();
				} catch (SQLException ex)	{
					ex.printStackTrace();
				}
				closeConnection(conn);	
			}
		}
		return user;
	}
	public void join(user user){
		Connection conn = getConnection();
		if(conn != null) {
			PreparedStatement ps = null;
			try {
				String sqlQuery ="INSERT INTO `musicclipper`.`user` "
						+ "(`email`, `password`) VALUES ('" + user.getEmail() + "', '"
						+ user.getPassword() + "');";
				ps = conn.prepareStatement(sqlQuery);
				
				ps.executeUpdate();
				
			} catch(SQLException e) {
				e.printStackTrace();
			}
			finally {
				try {
					ps.close();
				} catch (SQLException ex) {
					ex.printStackTrace();
				}
				closeConnection(conn);
			}
		}
	}
	public ArrayList<playlist> getUserPlayList(int userID){
		ArrayList<playlist> list = new ArrayList<playlist>();

		Connection conn = getConnection();
		if(conn != null) {
			ResultSet rs = null;
			PreparedStatement ps = null;
			try {
				String sqlQuery = "SELECT Distinct * FROM playlist WHERE userID="+userID;
				ps = conn.prepareStatement(sqlQuery);
				rs = ps.executeQuery();
				while(rs.next()) {
					playlist tmp = new playlist();
					tmp.setUserId(userID);
					tmp.setTitle(rs.getString("title"));
					tmp.setSinger(rs.getString("singer"));
					tmp.setUrl(rs.getString("url"));
					tmp.setSourceType(rs.getInt("sourceType"));
					tmp.setImage(rs.getString("image"));
					list.add(tmp);
				}
			} catch(SQLException e) {
				e.printStackTrace();
			}
			finally {
				try {
					rs.close();
					ps.close();
				} catch (SQLException ex) {
					ex.printStackTrace();
				}
				closeConnection(conn);	
			}
		}
		return list;
	}
	public void insertMyList(playlist list){
		Connection conn = getConnection();
		if(conn != null) {
			PreparedStatement ps = null;
			try {
				String sqlQuery = "INSERT INTO `musicclipper`.`playlist` "
						+ "(`userId`,`title`,`sourceType`,`image`,`singer`,`url`) "
						+ "VALUES (" 
						+ list.getUserId() + ", "
						+ "'" + list.getTitle() + "', "
						+ list.getSourceType() + ", "
						+ "'" + list.getImage() + "', "
						+ "'" + list.getSinger() + "', "
						+ "'" + list.getUrl() + "');";
				ps = conn.prepareStatement(sqlQuery);
				
				ps.executeUpdate();
				
			} catch(SQLException e) {
				e.printStackTrace();
			}
			finally {
				try {
					ps.close();
				} catch (SQLException ex) {
					ex.printStackTrace();
				}
				closeConnection(conn);
			}
		}
	}
	/*public int getIdx(String id){
		int idx = -1;
		Connection conn = getConnection();
		
		if(conn != null){
			ResultSet rs = null;
			PreparedStatement ps = null;
			try {
				String sqlQuery = "SELECT idx FROM user WHERE id=" + '"' + id + '"';
				ps = conn.prepareStatement(sqlQuery);
				rs = ps.executeQuery();
 				while(rs.next()) {
					idx = rs.getInt("idx");
				}
			}
			catch(SQLException e){
				e.printStackTrace();
			}
			finally	{
				try	{
					rs.close();
					ps.close();
				} catch (SQLException ex)	{
					ex.printStackTrace();
				}
				closeConnection(conn);	
			}
		}
		return idx;
	}*/
}
