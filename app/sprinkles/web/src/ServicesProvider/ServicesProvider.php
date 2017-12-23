<?php
/**
 * UserFrosting (http://www.userfrosting.com)
 *
 * @link      https://github.com/userfrosting/UserFrosting
 * @license   https://github.com/userfrosting/UserFrosting/blob/master/licenses/UserFrosting.md (MIT License)
 */

namespace UserFrosting\Sprinkle\Web\ServicesProvider;

use UserFrosting\I18n\MessageTranslator;
use UserFrosting\Sprinkle\Web\Twig\DataExtension;
use UserFrosting\Sprinkle\Web\Twig\HtmlExtension;
use UserFrosting\Sprinkle\Web\Twig\LevenExtension;
use UserFrosting\Sprinkle\Web\Twig\ThemeExtension;
use UserFrosting\Sprinkle\Web\Twig\WebExtension;
use UserFrosting\Support\Repository\Loader\ArrayFileLoader;
use UserFrosting\Support\Repository\Loader\YamlFileLoader;
use Doctrine\Common\Cache\ArrayCache;
use Asm89\Twig\CacheExtension\CacheProvider\DoctrineCacheAdapter;
use Asm89\Twig\CacheExtension\CacheStrategy\LifetimeCacheStrategy;
use Asm89\Twig\CacheExtension\Extension as CacheExtension;

/**
 *
 * @author Alex Weissman (https://alexanderweissman.com)
 */
class ServicesProvider
{
    /**
     * Register extended user fields services.
     *
     * @param Container $container A DI container implementing ArrayAccess and container-interop.
     */
    public function register($container)
    {
        /**
         * Extend the 'classMapper' service to register model classes.
         *
         * Mappings added: DemoUser
         */
        session_start();

//        $container['translator'] = function ($c) {
//            // Load the translations
//            $paths = $c->localePathBuilder->buildPaths();
//
//            $loader = new YamlFileLoader($paths);
//
//            // Create the $translator object
//            $translator = new MessageTranslator($loader->load());
//
//            return $translator;
//        };
        $container->extend('classMapper', function ($classMapper, $c) {
            $classMapper->setClassMapping('user', 'App\Model\User');
            return $classMapper;
        });

        $container['csrf'] = function ( $c) {
            $guard = new \Slim\Csrf\Guard();
            $guard->setFailureCallable(function ($request, $response, $next) {
                $request = $request->withAttribute("csrf_status", false);
                return $next($request, $response);
            });
            return $guard;
        };

        $container->extend('view', function ($view, $c) {
            $twig = $view->getEnvironment();


            $cacheProvider  = new DoctrineCacheAdapter(new ArrayCache());
            $cacheStrategy  = new LifetimeCacheStrategy($cacheProvider);
            $cacheExtension = new CacheExtension($cacheStrategy);

            $twig->addExtension($cacheExtension);

            $extension = new LevenExtension($c);


//            $twig->addExtension($extension);
//
//            $extension = new DataExtension($c);


            $twig->addExtension($extension);

            $extension = new HtmlExtension($c);
            $twig->addExtension($extension);

            $extension = new WebExtension($c);
            $twig->addExtension($extension);
            $extension = new ThemeExtension($c);
            $twig->addExtension($extension);


            return $view;
        });

    }
}
