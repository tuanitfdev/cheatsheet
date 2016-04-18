<?php
/**
 * Created by PhpStorm.
 * User: TUAN
 * Date: 11/21/2015
 * Time: 2:34 PM
 */

class Layout1_controller extends CI_Controller {
    protected $layout_template;
    protected $header;
    protected $footer;
    protected $left_sidebar;

    public function __construct() {
        parent::__construct();
        $this->layout_template = $this->config->item('layout1');
        $this->$header = $this->config->item('header');
        $this->$footer = $this->config->item('footer');
        $this->$left_sidebar = $this->config->item('left_sidebar');
    }

		protected function setHeaderTpl($headerTplPath) {
			$this->$header = $headerTplPath;
		}

		protected function setFooterTpl($footerTplPath) {
			$this->$footer = $footerTplPath;
		}

		protected function setSidebarTpl($footerTplPath) {
			$this->$left_sidebar = $footerTplPath;
		}

		public function loadView() {

		}

} 