package servlet;

import java.io.*;

import java.util.Random;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;

import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpSession;

import model.DbManager;
import beans.user;
import beans.playlist;

/**
 * Servlet implementation class UserServlet
 */
@WebServlet(
		urlPatterns = { "/Mylist" }, 
		initParams = { 
				@WebInitParam(name = "jdbcDriver", value = "com.mysql.jdbc.Driver"), 
				@WebInitParam(name = "dbUrl", value = "jdbc:mysql://localhost:3306/musicclipper?useUnicode=true&amp;characterEncoding=UTF-8"), 
				@WebInitParam(name = "dbPass", value = "webclass"), 
				@WebInitParam(name = "dbUser", value = "root")
		})
public class Mylist extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private DbManager dbManager;
	private user user;
	
	public void init(ServletConfig config) throws ServletException {
		// TODO Auto-generated method stub
		super.init();
		dbManager = new DbManager();
		dbManager.setDbUrl(config.getInitParameter("dbUrl"));
		dbManager.setDbUser(config.getInitParameter("dbUser"));
		dbManager.setDbPass(config.getInitParameter("dbPass"));
		try {
			Class.forName(config.getInitParameter("jdbcDriver"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		processRequest(request, response);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		processRequest(request, response);
	}
	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		
		playlist tmp = new playlist();
		tmp.setImage(request.getParameter("image"));
		tmp.setSinger(request.getParameter("singer"));
		tmp.setSourceType(Integer.parseInt(request.getParameter("sourceType")));
		tmp.setTitle(request.getParameter("title"));
		tmp.setUrl(request.getParameter("url"));
		tmp.setUserId(Integer.parseInt(request.getParameter("userId")));

		dbManager.insertMyList(tmp);
	}
}
