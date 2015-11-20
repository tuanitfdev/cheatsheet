<?php
class Layout extends CI_Controller{
	public function __construct(){
		parent::__construct();
	}
	public function index(){
		$temp['title']="QHOnline Layout";
		$temp['template']='index_layout';
		$temp['data']['info']="Welcome to CI Layout - QHOnline.Info";
		$this->load->view("bluesky/layout",$temp);
	}
}