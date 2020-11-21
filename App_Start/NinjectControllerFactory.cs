using LightBakes.Models;
using Ninject;
using System;
using System.Web.Mvc;
using System.Web.Routing;

namespace LightBakes.App_Start
{
    public class NinjectControllerFactory : DefaultControllerFactory
    {
        #region Data Members

        /// <summary>
        ///     NInject Kernel
        /// </summary>
        private readonly IKernel _ninjectKernel;

        #endregion

        #region Constructor

        /// <summary>
        ///     Default constructor
        /// </summary>
        public NinjectControllerFactory()
        {
            _ninjectKernel = new StandardKernel();
            AddBindings();
        }

        #endregion

        #region Protected Methods

        /// <summary>
        /// </summary>
        /// <param name="requestContext"></param>
        /// <param name="controllerType"></param>
        /// <returns></returns>
        protected override IController GetControllerInstance(RequestContext requestContext, Type controllerType)
        {
            return controllerType == null ? null : (IController)_ninjectKernel.Get(controllerType);
        }

        #endregion

        #region Private Methods

        /// <summary>
        ///     Add bindings for differenctes services
        /// </summary>
        private void AddBindings()
        {
            _ninjectKernel.Bind<IMailer>().To<Mailer>();
        }

        #endregion
    } //class NinjectControllerFactory
}