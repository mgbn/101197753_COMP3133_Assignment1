const Employee = require('./models/Employee');
const User = require('./models/User');
const jwt = require('jsonwebtoken');


exports.resolvers = {
    Query: {
        getEmployees: async (parent, args) => {
            return Employee.find({})
        },
        getEmployeeByID: async (parent, args) => {
            return Employee.findById(args.id)
        },
        login: async (_, { email, password }, { models }) => {
            const user = await models.User.findOne({ email });
            if (!user) {
              throw new Error('Incorrect email or password');
            }
      
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
              throw new Error('Incorrect email or password');
            }
      
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
              expiresIn: '1d',
            });
      
            return {
              token,
              user,
            };
          }  
    },

    Mutation: {
        addEmployee: async (parent, args) => {
            console.log(args)

            let newEmp = new Employee({
                firstname: args.firstname,
                lastname: args.lastname,
                email: args.email,
                gender: args.gender,
                salary: args.salary
            })

            return newEmp.save()
        },
        updateEmployee: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return;
            }

            return await Employee.findOneAndUpdate(
            {
                _id: args.id
            },
            {
                $set: {
                    firstname: args.firstname,
                    lastname: args.lastname,
                    email: args.email,
                    gender: args.gender,
                    salary: args.salary
                }
            }, {new: true}, (err, employee) => {
                if (err) 
                {
                    console.log('Something went wrong when updating the employee');
                } else 
                {
                    return employee
                }
            }
        );
      },

      signup: async (parent, { username, email, password }) => {
        const user = new User({
          username,
          email,
          password
        });
        await user.save();
        return user;
      },

      deleteEmployee: async (parent, args) => {
        console.log(args)
        if (!args.id){
            return JSON.stringify({status: false, "message" : "No ID found"});
        }
        return await Employee.findByIdAndDelete(args.id)
      }
    }
}