<?php

namespace AppBundle\Controller\Api;

use AppBundle\Controller\BaseController;
use AppBundle\Entity\User;
use AppBundle\Form\UserType;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class UserController
 * @package AppBundle\Controller\Api
 *
 * @Route("/api/users")
 */
class UserController extends BaseController
{
    /**
     * @ApiDoc(
     * description="Create a new user",
     *
     *    statusCodes = {
     *        200 = "Creation with success",
     *        400 = "invalid form"
     *    },
     *    responseMap={
     *         200 = {"class"=User::class},
     *    },
     *     section="users"
     *
     * )
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route(name="create_user")
     * @Method({"POST"})
     */
    public function addAction(Request $request)
    {
        $form       = $this->createForm(UserType::class);
        $parameters = $this->processForm($request, $form);
        $result     = $this->getUserManager()->addUser(
            $parameters["email"],
            $parameters["username"],
            $parameters["password"]
        );
        return $this->createApiResponse($result);
    }
}