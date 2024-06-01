import { Router, Request, Response } from 'express';
import Role from '../models/role.model';
import router from './default.routes';

const RolesRoute = Router();
let BASE_URL = process.env.NODE_BASE_URL || '/api/v1';


function isErrorWithMessage(error: any): error is Error {
  return error && typeof error.message === 'string';
}

router.get(`${BASE_URL}/roles`, async (req: Request, res: Response) => {
  try {
    const roles = await Role.find();

    const rolesWithRoleField = roles.filter(role => role.role);
    
    res.status(200).json(rolesWithRoleField);
  } catch (error) {
    const errorMessage = isErrorWithMessage(error) ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

// router.post('/roles', async (req: Request, res: Response) => {
//   const { role } = req.body;

//   try {
//     const newRole = new Role({ role });
//     await newRole.save();
//     res.status(201).json(newRole);
//   } catch (error) {
//     const errorMessage = isErrorWithMessage(error) ? error.message : 'An unknown error occurred';
//     res.status(400).json({ error: errorMessage });
//   }
// });

// router.get('/roles/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const role = await Role.findById(id);
//     if (!role) {
//       return res.status(404).json({ message: 'Role not found' });
//     }
//     res.status(200).json(role);
//   } catch (error) {
//     const errorMessage = isErrorWithMessage(error) ? error.message : 'An unknown error occurred';
//     res.status(500).json({ error: errorMessage });
//   }
// });

// router.put('/roles/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { role } = req.body;

//   try {
//     const updatedRole = await Role.findByIdAndUpdate(id, { role }, { new: true });
//     if (!updatedRole) {
//       return res.status(404).json({ message: 'Role not found' });
//     }
//     res.status(200).json(updatedRole);
//   } catch (error) {
//     const errorMessage = isErrorWithMessage(error) ? error.message : 'An unknown error occurred';
//     res.status(400).json({ error: errorMessage });
//   }
// });

// router.delete('/roles/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const deletedRole = await Role.findByIdAndDelete(id);
//     if (!deletedRole) {
//       return res.status(404).json({ message: 'Role not found' });
//     }
//     res.status(200).json({ message: 'Role deleted' });
//   } catch (error) {
//     const errorMessage = isErrorWithMessage(error) ? error.message : 'An unknown error occurred';
//     res.status(500).json({ error: errorMessage });
//   }
// });

export default RolesRoute;
