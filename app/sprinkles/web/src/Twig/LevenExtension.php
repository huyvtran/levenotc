<?php

namespace UserFrosting\Sprinkle\Web\Twig;




use UserFrosting\Sprinkle\Web\Facades\Log;
use UserFrosting\Sprinkle\Web\Service\Data;

class LevenExtension extends \Twig_Extension
{
    /**
     * @var ContainerInterface
     */
    protected $container;



    protected $pageScripts;

    protected $locale;

    protected $defaultCloudSdkHost;

    public function __construct($container)
    {
        $this->container = $container;

    }

    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('trans', array($this, 'trans')),

        );
    }

    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('path', array($this, 'pathFor')),
            new \Twig_SimpleFunction('dump', array($this, 'dump')),
            new \Twig_SimpleFunction('setting', array($this, 'gettoo')),
            new \Twig_SimpleFunction('csrf_token', array($this, 'gettoo')),
            new \Twig_SimpleFunction('asset', array($this, 'gettoo')),
            new \Twig_SimpleFunction('cloudConsultPath', array($this, 'gettoo')),
            new \Twig_SimpleFunction('service', array($this, 'gettoo')),
            new \Twig_SimpleFunction('css', array($this, 'gettoo')),
            new \Twig_SimpleFunction('slot', array($this, 'gettoo')),
            new \Twig_SimpleFunction('is_plugin_installed', array($this, 'gettoo')),
            new \Twig_SimpleFunction('data', array($this, 'getData')),
            new \Twig_SimpleFunction('script', array($this, 'loadScript')),
            new \Twig_SimpleFunction('has_permission', array($this, 'gettoo')),
            new \Twig_SimpleFunction('asset_version', array($this, 'gettoo')),
            new \Twig_SimpleFunction('get_next_excuted_time', array($this, 'gettoo')),


        );
    }

    public function pathFor($name, $data = [], $queryParams = [], $appName = 'default')
    {
        return $this->container->router->pathFor($name, $data, $queryParams);
    }

    public function dump($name)
    {
        return dump($name);
    }
    public function getData( $method, $arguments)
    {


        $service = new Data($this->container);
        $reflectionClass = new \ReflectionClass($service);

        return $reflectionClass->getMethod($method)->invokeArgs($service, $arguments);
    }

    public function gettoo($js=null)
    {

    }
    public function loadScript($js=array() )
    {
        $jss = is_array($js) ? $js : array($js);


        foreach ($jss as $js){

              echo  "<script src='".$js."'></script>" ;
              //echo  "<script src='".Assets::url('assets://'.$js)."'></script>" ;
            //echo Assets::url('assets://'.$js) ;
            //Assets::url(str_replace(".js",'.js',$js));

        }

//        if ($this->pageScripts) {
//            $this->pageScripts = array_merge($this->pageScripts, $js);
//        } else {
//            $this->pageScripts = $js;
//        }
    }


    public function trans($key, $parameters = array())
    {
        return $this->container->get('translator')->translate($key, $parameters);
    }



//    public function getGlobals()
//    {
//        // CSRF token name and value
//        $csrfNameKey = $this->container->csrf->getTokenNameKey();
//        $csrfValueKey = $this->container->csrf->getTokenValueKey();
//        $csrfName = $this->container->csrf->getTokenName();
//        $csrfValue = $this->container->csrf->getTokenValue();
//
//
//
//        $csrf = [
//            'csrf'   => [
//                'keys' => [
//                    'name'  => $csrfNameKey,
//                    'value' => $csrfValueKey
//                ],
//                'name'  => $csrfName,
//                'value' => $csrfValue
//            ],
//
//        ];
//
//        $site = array_replace_recursive($this->services->config['site'], $csrf);
//
//        return [
//            'site'   => $site,
//            'assets' => $this->services->assets
//        ];
//    }


}
