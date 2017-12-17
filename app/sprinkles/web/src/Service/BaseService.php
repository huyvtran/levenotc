<?php
/**
 * Created by PhpStorm.
 * User: genv
 * Date: 2017/11/30
 * Time: ä¸???8:21
 */

namespace UserFrosting\Sprinkle\Web\Service;


class BaseService
{

    /**
     * Constructor.
     *
     * @param ContainerInterface $container
     */
    public function __construct(ContainerInterface $container,Logger $logger)
    {
        $this->container = $container;
        $this->logger=$logger;

        $logger->info("dfasdfasdf");


    }
}