<?php

namespace UserFrosting\System;

 use Codeages\Biz\Framework\Context\Biz;
use Codeages\Biz\Framework\Provider\DoctrineServiceProvider;
use Codeages\Biz\Framework\Provider\MonologServiceProvider;

use Codeages\Biz\Framework\Provider\RedisServiceProvider;
use Symfony\Component\HttpFoundation\Request;
 use Topxia\Service\Common\ServiceKernel;
use UserFrosting\System\UserFrosting;

class AppKernel extends UserFrosting
{
    protected $plugins = array();

    /**
     * @var Request
     */
    protected $request;

    protected $extensionManger;

    private $isServiceKernelInit = false;

    protected $pluginConfigurationManager;

    public function __construct()
    {
        parent::__construct();
        date_default_timezone_set('Asia/Shanghai');
        $this->extensionManger = ExtensionManager::init($this);
     }

    public function boot()
    {
        if (true === $this->booted) {
            return;
        }
        $this->registerContainerConfiguration();

        // init container
        //$this->initializeContainer();

        $this->initializeBiz($this->getContainer()->get('biz'));
        $this->initializeServiceKernel();


        $this->booted = true;
    }

    public function registerBundles()
    {

    }

    public function registerContainerConfiguration(LoaderInterface $loader)
    {
        $loader->load(__DIR__ . '/config/config_' . $this->getEnvironment() . '.yml');
    }



    public function setRequest(Request $request)
    {
        $this->request = $request;

        return $this;
    }

    public function initializeBiz(Biz $biz)
    {
        $biz['migration.directories'][] = dirname(__DIR__) . '/migrations';
        $biz['env'] = array(
            'base_url' => $this->request->getSchemeAndHttpHost() . $this->request->getBasePath(),
        );

        $biz->register(new DoctrineServiceProvider());
        $biz->register(new MonologServiceProvider(), array(
            'monolog.logfile' => $this->getContainer()->getParameter('kernel.logs_dir') . '/biz.log',
            'monolog.level' => $this->isDebug() ? \Monolog\Logger::DEBUG : \Monolog\Logger::INFO,
            'monolog.permission' => 0666
        ));
        $biz->register(new \Codeages\Biz\Framework\Provider\SchedulerServiceProvider());
        $biz->register(new \Codeages\Biz\Framework\Provider\TargetlogServiceProvider());
        $biz->register(new \Biz\DefaultServiceProvider());

        $collector = $this->getContainer()->get('biz.service_provider.collector');
        foreach ($collector->all() as $provider) {
            $biz->register($provider);
        }

        //$biz->register(new Codeages\Biz\RateLimiter\RateLimiterServiceProvider());
        $this->registerCacheServiceProvider($biz);
//        $biz->register(new Codeages\Biz\Order\OrderServiceProvider());
//        $biz->register(new Codeages\Biz\Pay\PayServiceProvider());

        $biz->register(new \Biz\Accessor\AccessorServiceProvider());
        $biz->register(new \Biz\OrderFacade\OrderFacadeServiceProvider());
        $biz->register(new \Biz\Xapi\XapiServiceProvider());
        $biz->register(new \Codeages\Biz\Framework\Provider\SessionServiceProvider());
        $biz->register(new \Codeages\Biz\Framework\Provider\QueueServiceProvider());

        $biz->boot();

        //$biz['pluginConfigurationManager'] = $this->pluginConfigurationManager;
    }

    protected function registerCacheServiceProvider($biz)
    {
        if ($this->getContainer()->hasParameter('redis_host')) {
            $biz->register(
                new RedisServiceProvider(),
                array(
                    'redis.options' => array(
                        'host' => $this->getContainer()->getParameter('redis_host'),
                        'timeout' => $this->getContainer()->getParameter('redis_timeout'),
                        'reserved' => $this->getContainer()->getParameter('redis_reserved'),
                        'redis_interval' => $this->getContainer()->getParameter('redis_retry_interval'),
                    ),
                    'dao.cache.enabled' => true,
                )
            );
        }
    }

    protected function initializeServiceKernel()
    {
        if (!$this->isServiceKernelInit) {
            $container = $this->getContainer();
            $biz = $container->get('biz');

            $serviceKernel = ServiceKernel::create($this->getEnvironment(), $this->isDebug());

            $currentUser = new \Biz\User\AnonymousUser($this->request->getClientIp() ? : '127.0.0.1');

            $biz['user'] = $currentUser;
            $serviceKernel
                ->setBiz($biz)
                ->setCurrentUser($currentUser)
                ->setEnvVariable(
                array(
                    'host' => $this->request->getHttpHost(),
                    'schemeAndHost' => $this->request->getSchemeAndHttpHost(),
                    'basePath' => $this->request->getBasePath(),
                    'baseUrl' => $this->request->getSchemeAndHttpHost() . $this->request->getBasePath(),
                )
            )
                ->setTranslatorEnabled(true)
                ->setTranslator($container->get('translator'))
                ->setParameterBag($container->getParameterBag())
                ->registerModuleDirectory(dirname(__DIR__) . '/plugins');

            $this->isServiceKernelInit = true;
        }
    }

    public function getCacheDir()
    {
        $theme = $this->pluginConfigurationManager->getActiveThemeName();
        $theme = empty($theme) ? '' : ucfirst(str_replace('-', '_', $theme));

        return $this->rootDir . '/cache/' . $this->environment . '/' . $theme;
    }
}
