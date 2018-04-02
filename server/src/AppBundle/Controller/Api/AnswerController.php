<?php

namespace AppBundle\Controller\Api;


use AppBundle\Controller\BaseController;
use AppBundle\Entity\Question;
use AppBundle\Form\AnswerType;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class AnswerController
 * @package AppBundle\Controller\Api
 *
 * @Route("/api/answers")
 */
class AnswerController extends BaseController
{
    /**
     * @ApiDoc(
     * description="Get answers by question",
     *
     *    statusCodes = {
     *        200 = "Getting with success"
     *    },
     *     section="answers"
     *
     * )
     *
     * @param Question $question
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/get-by-question/{question}", name="get_answers_by_question")
     * @Method({"GET"})
     */
    public function getByQuestionAction(Question $question)
    {
        return $this->createApiResponse($this->getAnswerRepository()->findBy(
            ["question" => $question]
        ));
    }

    /**
     * @ApiDoc(
     * description="Add new answer",
     *
     *    statusCodes = {
     *        200 = "Creating with success"
     *    },
     *     section="answers"
     *
     * )
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route(name="add_answer")
     * @Method({"POST"})
     */
    public function addAction(Request $request)
    {
        $form       = $this->createForm(AnswerType::class);
        $parameters = $this->processForm($request, $form);
        $result     = $this->getAnswerManager()->addAnswer(
            $parameters["answerBody"],
            $parameters["questionId"],
            $this->getUser()
        );
        return $this->createApiResponse($result);
    }

    /**
     * @ApiDoc(
     * description="Update answer",
     *
     *    statusCodes = {
     *        200 = "Updating with success"
     *    },
     *     section="answers"
     *
     * )
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route(name="update_answer")
     * @Method({"PUT"})
     */
    public function updateAction(Request $request)
    {
        $form       = $this->createForm(AnswerType::class);
        $parameters = $this->processForm($request, $form);
        $result     = $this->getAnswerManager()->updateAnswer(
            $parameters["answerId"],
            $parameters["answerBody"],
            $this->getUser()
        );
        return $this->createApiResponse($result);
    }

    /**
     * @ApiDoc(
     * description="Delete answer",
     *
     *    statusCodes = {
     *        204 = "Deleting with success"
     *    },
     *     section="answers"
     *
     * )
     *
     * @param int $id
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/{id}", name="delete_answer")
     * @Method({"DELETE"})
     */
    public function deleteAction($id)
    {
        $this->getAnswerManager()->deleteAnswer($id, $this->getUser());
        return $this->createApiResponse([], 204);
    }
}