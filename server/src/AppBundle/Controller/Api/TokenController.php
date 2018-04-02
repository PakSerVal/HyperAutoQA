<?php

namespace AppBundle\Controller\Api;

use AppBundle\Controller\BaseController;
use AppBundle\Form\TokenType;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;

/**
 * Class TokenController
 * @package AppBundle\Controller\Api
 *
 * @Route("/api/tokens")
 */
class TokenController extends BaseController
{
    /**
     * @ApiDoc(
     * description="Get token",
     *
     *    statusCodes = {
     *        200 = "Getting with success",
     *        400 = "invalid form",
     *        401 = "Bad credentials",
     *        404 = "User not found"
     *    },
     *    section="tokens"
     *
     *
     * )
     *
     * @param Request $request
     * @return JsonResponse
     * @throws \Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTEncodeFailureException
     *
     * @Route(name="get_token")
     * @Method("POST")
     */
    public function getAction(Request $request)
    {
        $form       = $this->createForm(TokenType::class);
        $parameters = $this->processForm($request, $form);
        $user       = $this->getUserRepository()
            ->findOneBy(["email" => $parameters["email"]]);
        if (!$user) {
            throw $this->createNotFoundException("User not found!");
        }
        $isValid = $this->get("security.password_encoder")
            ->isPasswordValid($user, $parameters["password"]);
        if (!$isValid) {
            throw new BadCredentialsException();
        }
        $token = $this->get("lexik_jwt_authentication.encoder")
            ->encode([
                "email"    => $user->getEmail(),
                "exp"      => time() + 3600
            ]);
        return $this->createApiResponse([
            "token"    => $token,
            "id"       => $user->getId(),
            "email"    => $user->getEmail(),
            "username" => $user->getUsername()
        ]);
    }
}