<?php

namespace AppBundle\Controller\Api;

use AppBundle\Controller\BaseController;
use AppBundle\Form\QuestionType;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class QuestionController
 * @package AppBundle\Controller\Api
 *
 * @Route("/api/questions")
 */
class QuestionController extends BaseController
{
    /**
     * @ApiDoc(
     * description="Get all questions",
     *
     *    statusCodes = {
     *        200 = "Getting with success"
     *    },
     *     section="questions"
     *
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route(name="get_questions")
     * @Method({"GET"})
     */
    public function getAction()
    {
        return $this->createApiResponse($this->getQuestionRepository()->findAll());
    }

    /**
     * @ApiDoc(
     * description="Get question by id",
     *     requirements={
     *         {
     *             "name"="id",
     *             "dataType"="integer",
     *             "requirements"="\d+",
     *             "description"="The question unique identifier."
     *         }
     *     },
     *    statusCodes = {
     *        200 = "Getting with success"
     *    },
     *     section="questions"
     *
     * )
     *
     * @param int $id
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/{id}", name="get_question_by_id")
     * @Method({"GET"})
     */
    public function getByIdAction($id)
    {
        return $this->createApiResponse($this->getQuestionRepository()->find($id));
    }

    /**
     * @ApiDoc(
     * description="Get questions by user",
     *
     *    statusCodes = {
     *        200 = "Getting with success"
     *    },
     *     section="questions"
     *
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/get-by-user", name="get_questions_by_user")
     * @Method({"GET"})
     */
    public function getByUserAction()
    {
        return $this->createApiResponse($this->getQuestionRepository()->findBy(
            ["user" => $this->getUser()]
        ));
    }

    /**
     * @ApiDoc(
     * description="Create question",
     *
     *    statusCodes = {
     *        200 = "Creating with success"
     *    },
     *     section="questions"
     *
     * )
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route(name="create_question")
     * @Method({"POST"})
     */
    public function addAction(Request $request)
    {
        $form       = $this->createForm(QuestionType::class);
        $parameters = $this->processForm($request, $form);
        $result     = $this->getQuestionManager()->addQuestion(
            $parameters["questionTitle"],
            $parameters["questionBody"],
            $this->getUser()
        );
        return $this->createApiResponse($result);
    }

    /**
     * @ApiDoc(
     * description="Update question",
     *
     *    statusCodes = {
     *        200 = "Updating with success"
     *    },
     *     section="questions"
     *
     * )
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route(name="update_question")
     * @Method({"PUT"})
     */
    public function updateAction(Request $request)
    {
        $form       = $this->createForm(QuestionType::class);
        $parameters = $this->processForm($request, $form);
        $result     = $this->getQuestionManager()->updateQuestion(
            $parameters["questionId"],
            $parameters["questionTitle"],
            $parameters["questionBody"],
            $this->getUser()
        );
        return $this->createApiResponse($result);
    }


    /**
     * @ApiDoc(
     * description="Delete question",
     *     requirements={
     *         {
     *             "name"="id",
     *             "dataType"="integer",
     *             "requirements"="\d+",
     *             "description"="The question unique identifier."
     *         }
     *     },
     *    statusCodes = {
     *        204 = "Deleting with success"
     *    },
     *     section="questions"
     *
     * )
     *
     * @param $id
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/{id}", name="delete_question")
     * @Method({"DELETE"})
     */
    public function deleteAction($id)
    {
        $this->getQuestionManager()->deleteQuestion($id, $this->getUser());
        return $this->createApiResponse([], 204);
    }
}